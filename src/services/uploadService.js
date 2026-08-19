const API_URL = "https://api.jaffnabulls.com";

export function uploadPaymentProof(file, onProgress) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/get-upload-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          filetype: file.type || "application/octet-stream",
        }),
      });

      if (!response.ok) {
        throw new Error("The upload URL could not be created.");
      }

      const { uploadUrl, finalUrl } = await response.json();

      if (!uploadUrl || !finalUrl) {
        throw new Error("The upload service returned incomplete details.");
      }

      const request = new XMLHttpRequest();

      request.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          onProgress(Math.round((event.loaded / event.total) * 100));
        }
      });

      request.addEventListener("load", () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(finalUrl);
        } else {
          reject(new Error("The file could not be uploaded."));
        }
      });

      request.addEventListener("error", () => reject(new Error("The upload connection failed.")));
      request.addEventListener("abort", () => reject(new Error("The upload was cancelled.")));
      request.open("PUT", uploadUrl);
      request.setRequestHeader("Content-Type", file.type || "application/octet-stream");
      request.send(file);
    } catch (error) {
      reject(error instanceof Error ? error : new Error("The file upload failed."));
    }
  });
}
