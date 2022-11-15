export default class RakutenService {
    static async fetchRecipeRanking() {
        const rankingData  = await useFetch('https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1079324519433678968');

        // ランキングの背景カラーを決めるプロパティ追加
        rankingData.data.value.result[0].rankColor = 'gold';
        rankingData.data.value.result[1].rankColor = 'silver';
        rankingData.data.value.result[2].rankColor = 'bronze';
        rankingData.data.value.result[3].rankColor = 'blue';
        
        return rankingData.data.value.result
    }
}