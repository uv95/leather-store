import { AsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkConfig } from '../../../app/providers/StoreProvider';
import { ThunkExtraArg } from '../../../app/providers/StoreProvider/config/StateSchema';
import axios, { AxiosStatic } from 'axios';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>;
  actionCreator: AsyncThunk<Return, Arg, ThunkConfig<RejectedValue>>;
  getState: () => StateSchema;
  api: jest.MockedFunctionDeep<AxiosStatic>;
  navigate: jest.MockedFn<any>;

  constructor(
    actionCreator: AsyncThunk<Return, Arg, ThunkConfig<RejectedValue>>
  ) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn();
    this.api = mockedAxios;
    this.navigate = jest.fn();
  }

  async callThunk(arg?: Arg) {
    const action = this.actionCreator(arg as any);
    const result = await action(this.dispatch, this.getState, {
      api: this.api,
      navigate: this.navigate,
    } as ThunkExtraArg);

    return result;
  }
}
