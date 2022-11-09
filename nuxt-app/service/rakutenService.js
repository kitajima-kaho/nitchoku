export default class RakutenService {
    static async fetchRecipeRanking() {
        const rankingData  = await useFetch('https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1079324519433678968');
        return rankingData.data.value.result
    }
}