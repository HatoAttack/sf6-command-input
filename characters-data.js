// キャラクター技データを管理するファイル
const CharactersData = {
  // 現在のバージョン
  version: '1.0',
  
  // キャラクターリスト（将来的に他のキャラクターを追加可能）
  characters: [
    {
      id: 'manon',
      name: 'マノン',
      // 必殺技リスト
      specials: [
        {
          name: 'マネージュ・ドレ',
          value: 'マネージュ・ドレ',
          variations: ['弱', '中', '強', 'OD']
        },
        {
          name: 'ロン・ポワン',
          value: 'ロン・ポワン',
          variations: ['弱', '中', '強', 'OD']
        },
        {
          name: 'デガジェ',
          value: 'デガジェ',
          variations: ['弱', '中', '強', 'OD']
        },
        {
          name: 'ランヴェルセ',
          value: 'ランヴェルセ',
          variations: ['弱', '中', '強', 'OD']
        },
        {
          name: 'グラン・フェッテ',
          value: 'グラン・フェッテ',
          variations: ['弱', '中', '強', 'OD']
        }
      ],      
    }
    // 将来的に他のキャラクターを追加可能
  ],
  
  // キャラクターIDからキャラクターデータを取得する関数
  getCharacter: function(characterId) {
    return this.characters.find(char => char.id === characterId);
  },
  
  // 全てのキャラクターリストを取得する関数
  getAllCharacters: function() {
    return this.characters;
  }
};