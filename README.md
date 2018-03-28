# priparaDB-firebase

## 概要

プリパラDBなるものをFireBaseでホスティングするためのものです．

## 作業の流れ

1. 作業
    - `firebase.rules.json`で，データベースの構造?やパーミッションを定義します
    - `public/`で，firebase内にてホスティングするページを作成します
2. リモートの`master`ブランチにプッシュするとCI経由でFireBaseにデプロイされます
3. `public/`の内容が`https://prickathon.firebaseapp.com/`に反映されているか確認