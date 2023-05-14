export default function createFileInputHandler(
  behavior: (result: string | null) => void
) {
  return () => {
    // Create a file input element
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    // When the file is selected, perform the specific behavior
    input.onchange = (event) => {
      if (event.target) {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.files && inputElement.files[0]) {
          const file = inputElement.files[0];
          const fileSizeLimit = 1 * 1024 * 1024;
          if (file.size > fileSizeLimit) {
            alert("This image is too large. Maximum size is 1MB.");
            return;
          }
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target) {
              behavior(e.target.result as string);
            }
          };
          reader.readAsDataURL(file);
        }
      }
    };

    input.click();
  };
}
