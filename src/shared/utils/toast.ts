export function showToast(message: string, type: "success" | "error") {
    let container = document.querySelector(".toast") as HTMLElement;
  
    if (!container) {
      container = document.createElement("div");
      container.className = "toast toast-top toast-end z-50";
      document.body.appendChild(container);
    }
  
    const toast = document.createElement("div");
    toast.className = `alert alert-${type} shadow-lg`;
    toast.innerHTML = `<span>${message}</span>`;
  
    container.appendChild(toast);
  
    setTimeout(() => {
      toast.remove();
    }, 1000);
  }
  