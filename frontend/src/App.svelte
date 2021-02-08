<script lang="ts">
  import DatePicker from "./components/DatePicker.svelte";
  import GetButton from "./components/GetButton.svelte";
  import Listing from "./components/Listing.svelte";
  import ParseButton from "./components/ParseButton.svelte";
  import Table from "./components/Table.svelte";
  import UploadButton from "./components/UploadButton.svelte";
  import Uploader from "./components/Uploader.svelte";
</script>

<main>
  <h1>kasboek verwerker</h1>
  <div>
    <h3>kasboek downloader</h3>
    <div>
      <div>
        <DatePicker title="begin dag" />
        <DatePicker title="eind dag" />
      </div>
      <GetButton />
    </div>
  </div>
  <div>
    <h3>kasboek uploader</h3>
    <Uploader />
    <ParseButton />
    <UploadButton />
  </div>
  <Listing />
  <Table />
</main>

<style>
  main {
    text-align: center;
    font-family: "Ubuntu", sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  h1 {
    color: #7b51b3;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
