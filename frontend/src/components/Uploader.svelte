<script lang="ts">
  import convertUploadedCsvToRow  from "../service/filereader";
  export let files: File[];
  const handleFileChange = (e: Event) => {
      files = [...(<HTMLInputElement>e.target).files]
  };
//   const handleProcessing = async (files: File[]) => {
//     for (const file of files) {
//       if (file.name.toLowerCase().includes("xls")) {
//        await convertUploadedCsvToRow(file)
//       }
//     }
//   }

//   $: if(files && files.length > 0){
//       handleProcessing(files)
//   }
  
</script>



<style>
    /* your styles go here */
</style>

<div>
    <input on:change={handleFileChange} type="file" id="uploader" />
</div>