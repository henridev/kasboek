<script lang="ts">
  import { onDestroy } from "svelte";
  import type { renderedFile } from "../models/RenderedFile";
  import { files, rows } from "../data/store";
  import convertUploadedCsvToRow from "../service/filereader";
    
  let files_to_process: renderedFile[];

  const unsubscribe = files.subscribe((new_files) => {
    files_to_process = new_files;
  });

  onDestroy(unsubscribe);

  const handleProcessing = async () => {
    if (files_to_process) {
      for (const {file} of files_to_process) {
          const currentFileName = file.name.toLowerCase()
        if (currentFileName.includes("xls")) {
          const row = await convertUploadedCsvToRow(file);
          rows.update((prevRows) => [...prevRows, row]);
          files.update((prevFiles) => {

              console.log('adjustIndex', prevFiles,currentFileName )
            const adjustIndex = prevFiles.findIndex(({file: {name}})=> name.toLowerCase() === currentFileName)
          console.log('adjustIndex', adjustIndex)
            if(adjustIndex < 0) return prevFiles
            prevFiles[adjustIndex].isParsed = true
            return prevFiles
          });
        }
      }
    }
  };
</script>

<button on:click={handleProcessing}>verwerk kasboeken</button>

<style>
</style>
