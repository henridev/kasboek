<script lang="ts">
  import { files } from "../data/store";
  import type { renderedFile } from "../models/RenderedFile";

  const handleFileChange = (e: Event) => {
    const uploadedFiles = (<HTMLInputElement>e.target).files;
    let newFiles: renderedFile[] = [];
    for (const file of uploadedFiles) {
      newFiles.push({ file, isParsed: false });
    }
    files.update((prevFiles) => [...prevFiles, ...newFiles]);
  };
</script>

<input on:change={handleFileChange} type="file" id="uploader" multiple />

<style>
  input {
    background-color: #7b51b3;
    color: white;
  }
</style>
