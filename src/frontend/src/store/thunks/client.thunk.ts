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
