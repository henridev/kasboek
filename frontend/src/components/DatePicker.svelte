<script lang="ts">
  import { dates } from "../data/store"; 
  export let title: string = "begin dag"

  const handleChange = async (e) => {
      console.log('e.target.value', e.target.value)
      dates.update(dates => {
          if(title.includes("eind")){
            return ({...dates, end: e.target.value})
          } else {
            return ({...dates, start: e.target.value}) 
          }
        })
  };
</script>

<label for="start-day">{title}</label>
<input on:change={handleChange} type="date" id="start-day" name="start-day" />

<style>
</style>
