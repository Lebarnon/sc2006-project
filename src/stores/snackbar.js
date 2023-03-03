import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", {
  state: () => {
    return {
      show: false,
      message: null,
    }
  },
  actions:{
    display(message){
      console.log("fired")
      this.message = message
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 1500);
    }
  }
})