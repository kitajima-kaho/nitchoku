import { defineStore } from 'pinia'

export const useRankingDataFetch = defineStore('RankingDataFetch',{
    state: () => {
        return {
            recipeRanking: [],
        }
    },

    actions: {
        // データを取得し、stateの変数に入れる。
        async useFetchRanking() {
            const rankingData  = await useFetch('https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1079324519433678968');
            this.recipeRanking = rankingData.data.value.result
        },
    }
})