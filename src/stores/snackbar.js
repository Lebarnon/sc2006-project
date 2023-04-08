import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", {
  state: () => {
    return {
      show: false,
      message: null,
      color: ""
    }
  },
  actions:{
    display(message, color="grey-darken-2"){
      this.message = message
      this.show = true
      this.color = color
      setTimeout(() => {
        this.show = false
      }, 1500);
    }
  }
})