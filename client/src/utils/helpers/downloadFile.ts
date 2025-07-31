import { useAuthAxios } from "../hooks/useAxios";

const downloadFile = async (
  downloadUrl: string | undefined,
  fileName: string | undefined
) => {
  try {
    // Make a GET request to download the file
    const response = await useAuthAxios.get(`/api/v1/${downloadUrl}`, {
      responseType: "blob",
    });

    // Create a Blob from the response data
    const blob = new Blob([response.data], {
      type: response?.headers["content-disposition"] || "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName ? fileName : "unkown");
    link.style.display = "none"; // Hide the link for a cleaner user experience

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
    // Handle error
  }
};

export default downloadFile;
