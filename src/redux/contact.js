import { createSlice } from "@reduxjs/toolkit";



const initialStateValue = {
  city: "",
  country: "",
  email: "",
  firstName: "",
  id: null,
  image: "",
  lastName: "",
  phoneNumber: "",
  website: "",
};

export const userSlice = createSlice({
  name: "contact",
  initialState: { value: initialStateValue },
  reducers: {
    takeContactInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});




export const { takeContactInfo } = userSlice.actions;

export default userSlice.reducer;
