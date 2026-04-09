/**
 * Converts a File or FileList first element to a Base64 Data URL string.
 */
export const fileToBase64 = (file: File | FileList | null | undefined): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve(undefined);
            return;
        }

        const targetFile = file instanceof FileList ? file[0] : file;

        if (!targetFile) {
            resolve(undefined);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(targetFile);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};
