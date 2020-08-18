# chat-space

## アプリケーション概要
- グループを作成し、グループ内でメッセージや画像のやり取りができる、チャットアプリケーション

## URL
- ec2-user@54.249.178.140

## テスト用アカウント
- テストアカウント
    - name: taka
    - email: taka@taka
    - password: takashima

## 利用方法
- 新規登録（name／email／password）またはログインする
- グループを作成して、メンバーをを検索して追加する
- 画面左側の参加グループリストからグループを選択し、グループチャット画面に移動する
- 画面下のメッセージ蘭に送信したいメッセージを入力し、Sendボタンで送信する
- 画面下のメッセージ蘭右端の画像アイコンをクリックし、送信したい画像を選択し、Sendボタンで送信する
- 上記2点を同時に行うには、メッセージを入力し画像を選択し、Sendボタンで送信する
- 画面左上のユーザーネーム表示の隣にあるアイコンから、新規チャットグループ作成（左側）、ユーザーアカウント編集（右側）ができる
- 画面右上のEditボタンよりグループ編集ができる

## 目指した課題解決
- 任意のメンバーで構成したグループ内でのコミュニケーションを円滑にする

## 洗い出した要件
- 新規登録機能
- グループ内でのチャット機能
- 複数人によるグループチャット機能
- チャット相手の検索機能
- チャットグループへのユーザー招待機能
- チャットの履歴表示機能
- 画像送信機能
- チャットの自動更新

## ER図
![chat-space_ER図](https://user-images.githubusercontent.com/66991723/90388818-653d9280-e0c3-11ea-8411-88ec6cba1d4a.png)

## 画面遷移図
![chat-space画面遷移図](https://user-images.githubusercontent.com/66991723/90390798-f2ceb180-e0c6-11ea-8cc6-fb6a2a76ecc2.png)

## 実装した機能
- ユーザー管理機能（deviseを導入）
- グループ作成・編集・一覧表示機能
- メッセージ送信機能
- 画像の送信機能（carrierwaveとmini_magickを導入）
- メッセージ送信機能の非同期通信（JavaScript/jQuery/Ajax）
- ユーザーをインクリメンタルサーチ（JavaScript/jQuery/Ajax）
- チャットの自動更新（JavaScript/jQuery/Ajax）

## 実装予定の機能

## 開発環境
- ruby 2.6.5
- Rails 6.0.3.2
- 導入したGem
    - haml-rails, >= 1.0, <= 2.0.1
    - font-awesome-sass
    - devise
    - pry-rails
    - carrierwave
    - mini_magick
    - unicorn, 5.4.1, productionのみ
    - fog-aws

## ローカルでの操作方法

#### ターミナル
```
% cd  #ホームディレクトリに移動
% cd 任意のディレクトリ #ディレクトリに移動
% git clone https://github.com/taka0707/chat-space.git -b for_clone 
% cd chat-space #chat-spaceディレクトリに移動
% bundle install
% yarn install
% rails db:create #データベースの作成
% rails db:migrate #マイグレーションの実行
```

# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|unique: true|
|email|string|null: false|
|password|password|null: false|

### Association
- has_many :groups, through: :groups_users
- has_many :groups_users
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|content|text|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: :groups_users
- has_many :groups_users
- has_many :messages

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user