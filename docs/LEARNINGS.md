# 学習メモ

## テンプレート（毎日コピーして使う）

### YYYY/MM/DD（DayX）
**今日やったこと**
- 

**わかったこと**
- 

**まだわからないこと**
- 

**明日やること**
- 

---

### 2026/04/16（Day1）

**今日やったこと**
- 家族旅行しおりアプリのトップ画面・旅行作成画面を React + Tailwind で作った
- `src/App.jsx`, `src/components/TripList.jsx`, `src/components/CreateTrip.jsx` の3ファイル構成

**わかったこと**

#### Reactのファイル構成
- `main.jsx` → アプリの起動口。`<App />` を HTML の `#root` に差し込む（基本触らない）
- `App.jsx` → 全体の司令塔。どの画面を表示するか管理する
- `components/` フォルダ → 画面やパーツごとにファイルを分ける

#### JSXの書き方
1. **コンポーネントの定義** → `export default function 名前() { return (<JSX>) }`
2. **Propsの受け取り** → 引数を `{ onCreateNew }` と分割代入で受け取る
3. **JS埋め込み** → `{}` の中に変数・関数・計算式を書く（ifやforは書けない）
4. **条件分岐** → `{条件 ? <真の時> : <偽の時>}` の三項演算子を使う
5. **リスト描画** → `{配列.map((item) => <div key={item.id}>...</div>)}`。`key` 必須！
6. **イベント** → `onClick` `onChange` `onSubmit`（キャメルケース）
7. **CSSクラス** → HTML の `class` は JSX では `className` と書く
8. **コメント** → JSX内は `{/* コメント */}` と書く

**まだわからないこと**
- `useState` の詳しい仕組み（再レンダリングがどう起きるか）
- `useEffect` は何に使うのか

**明日やること**
- 旅行詳細画面（スケジュール・観光スポット・レストラン）を作る

---