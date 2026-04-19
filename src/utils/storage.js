/**
 * データ管理ユーティリティ（Firebase 版）
 *
 * Firestore でテキストデータ（旅行・スケジュール・スポット・レストラン）を管理する。
 *
 * 【localStorage版との違い】
 *   - すべての操作が非同期（async/await）になる
 *   - データを保存すると家族全員のスマホに自動的に反映される
 */
import {
  collection, doc,
  setDoc, updateDoc,
  onSnapshot, query, orderBy,
} from 'firebase/firestore'
import { db } from '../firebase'

// Firestore のコレクション名
const TRIPS = 'trips'

// ---- リアルタイム購読（読み取り） ----

/**
 * 旅行一覧をリアルタイムで購読する
 * @param {function} callback - データが更新されるたびに呼ばれる関数
 * @returns {function} 購読を解除する関数（コンポーネントのクリーンアップで呼ぶ）
 */
export function subscribeTrips(callback) {
  const q = query(collection(db, TRIPS), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

/**
 * 指定IDの旅行をリアルタイムで購読する
 * @param {string}   id       - 旅行ID
 * @param {function} callback - データが更新されるたびに呼ばれる関数
 * @returns {function} 購読を解除する関数
 */
export function subscribeTripById(id, callback) {
  return onSnapshot(doc(db, TRIPS, id), (docSnap) => {
    callback(docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null)
  })
}

// ---- 書き込み（非同期） ----

/** 新しい旅行を Firestore に追加する */
export async function addTrip(trip) {
  await setDoc(doc(db, TRIPS, trip.id), trip)
}

/**
 * 旅行の特定フィールド（schedule / spots / restaurants）を更新する
 * @param {string} id    - 旅行ID
 * @param {string} field - 更新するフィールド名
 * @param {Array}  value - 新しい値（配列）
 */
export async function updateTripField(id, field, value) {
  await updateDoc(doc(db, TRIPS, id), { [field]: value })
}
