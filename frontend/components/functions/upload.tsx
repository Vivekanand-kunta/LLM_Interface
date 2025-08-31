export async function filepost(prompt: string, files: File[]) {
    const formData = new FormData();
    formData.append("prompt", prompt);
    files.forEach((file) => formData.append("files", file));
  
    const res = await fetch("http://localhost:8000/api/model", {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    return res.json();
  }
  