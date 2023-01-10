import { store } from "utils/redux/store/store";

export type RootState = ReturnType<typeof store.getState>;
