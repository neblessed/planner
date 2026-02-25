import { createAsyncThunk } from '@reduxjs/toolkit';
import { ClientType } from '../../types/ClientType';
import { api } from '../../api/client';

export const fetchClients = createAsyncThunk(
	'clients/fetchClients',
	async () => {
		const response = await api.getClients();

		return response;
	},
);

export const createNewClient = createAsyncThunk(
	'clients/createNewClient',
	async (client: Omit<ClientType, 'id'>) => {
		const response = await api.createClient(client);

		return response;
	},
);

export const updateClient = createAsyncThunk(
	'clients/updateClient',
	async ({ id, ...data }: Partial<ClientType> & { id: number }) => {
		const response = await api.updateClient(id, data);

		return response;
	},
);
