<script setup>
import { useRankingDataFetch } from '~/stores/useFetch'

useRankingDataFetch().useFetchRanking()
console.log('aaaaa')

</script>
<template>
  <div>
    <NuxtPage />
  </div>
</template>

