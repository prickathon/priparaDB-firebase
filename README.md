# priparaDB-firebase

## 概要

プリパラDBなるものをFireBaseでホスティングするためのものです．

## 開発環境
Dockerfile からイメージをつくることで `firebase` コマンドが使えるようになります。

### Windows のユーザーのあなたへ
`d.ps1` はエイリアスコマンドになっています。

```shell
# イメージ作成
./d build 

# 初期設定 ( 必要な npm モジュールをインストール )
./d init

# コンテナ作成
# アクセス許可をしてください
./d run

# サーバー起動
./d serve
```

サーバーを立てるとローカルの変更が即時に反映されるようになります

## 作業の流れ

1. 作業
    - `firebase.rules.json`で，データベースの構造?やパーミッションを定義します
    - `public/`で，firebase内にてホスティングするページを作成します
2. リモートの`master`ブランチにプッシュするとCI経由でFireBaseにデプロイされます
3. `public/`の内容が`https://prickathon.firebaseapp.com/`に反映されているか確認