import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(__dirname, '../../planner.db');

const db: Database.Database = new Database(DB_PATH);

export const initDatabase = (): void => {
	try {
		// Таблица клиентов (создаем первой, так как meetings будет ссылаться на нее)
		db.exec(`
            CREATE TABLE IF NOT EXISTS clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                telegram TEXT NOT NULL UNIQUE,
                feedback INTEGER NOT NULL DEFAULT 0,
                note TEXT DEFAULT ''
            );
        `);

		// Проверяем, существует ли уже таблица meetings
		const tableExists = db
			.prepare(
				`
            SELECT name FROM sqlite_master 
            WHERE type='table' AND name='meetings'
        `,
			)
			.get();

		if (tableExists) {
			// Проверяем, есть ли уже поле personId
			const columnExists = db
				.prepare(
					`
                SELECT COUNT(*) as count FROM pragma_table_info('meetings') 
                WHERE name = 'personId'
            `,
				)
				.get() as { count: number };

			if (columnExists.count === 0) {
				// Начинаем транзакцию
				db.exec('BEGIN TRANSACTION;');

				try {
					// Создаем временную таблицу с новой структурой
					db.exec(`
                        CREATE TABLE meetings_new (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            personId INTEGER,
                            location TEXT NOT NULL,
                            date TEXT NOT NULL,
                            deadlineDate TEXT,
                            telegram TEXT NOT NULL,
                            wfolio TEXT,
                            status TEXT NOT NULL,
                            comment TEXT,
                            amount INTEGER,
                            FOREIGN KEY (personId) REFERENCES clients(id) ON DELETE SET NULL
                        );
                    `);

					// Копируем данные из старой таблицы
					// personId пока оставляем NULL, так как нет прямой связи со старой структурой
					db.exec(`
                        INSERT INTO meetings_new (
                            id, location, date, deadlineDate, telegram, 
                            wfolio, status, comment, amount
                        )
                        SELECT 
                            id, location, date, deadlineDate, telegram,
                            wfolio, status, comment, amount
                        FROM meetings;
                    `);

					// Удаляем старую таблицу
					db.exec(`DROP TABLE meetings;`);

					// Переименовываем новую таблицу
					db.exec(`ALTER TABLE meetings_new RENAME TO meetings;`);

					db.exec('COMMIT;');
					console.log(
						'✅ Meetings table migrated with personId foreign key',
					);
				} catch (error) {
					db.exec('ROLLBACK;');
					throw error;
				}
			}
		} else {
			// Создаем таблицу meetings с новой структурой
			db.exec(`
                CREATE TABLE IF NOT EXISTS meetings (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    personId INTEGER,
                    location TEXT NOT NULL,
                    date TEXT NOT NULL,
                    deadlineDate TEXT,
                    telegram TEXT NOT NULL,
                    wfolio TEXT,
                    status TEXT NOT NULL,
                    comment TEXT,
                    amount INTEGER,
                    FOREIGN KEY (personId) REFERENCES clients(id) ON DELETE SET NULL
                );
            `);
		}

		// Таблица расходов
		db.exec(`
            CREATE TABLE IF NOT EXISTS spendings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                spending TEXT NOT NULL,
                amount INTEGER NOT NULL,
                date TEXT NOT NULL
            );
        `);

		// Таблица цели
		db.exec(`
            CREATE TABLE IF NOT EXISTS goal (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                goal INTEGER NOT NULL DEFAULT 0
            );
            INSERT OR IGNORE INTO goal (id, goal) VALUES (1, 0);
        `);

		console.log('✅ Database initialized');
	} catch (error) {
		console.error('❌ Database init error:', error);
		throw error;
	}
};

export { db };
