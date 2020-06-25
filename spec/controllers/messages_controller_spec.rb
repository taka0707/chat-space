require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do
    # beforeブロックの内部に記述された処理は、各exampleが実行される直前に、毎回実行される
    context 'log in' do
      before do
        # ログインをする
        login user
        # 擬似的にindexアクションを動かすリクエスト
        get :index, params: { group_id: group.id }
      end

      it 'assigns @message' do
        # assigns(:message)がMessageクラスのインスタンスかつ未保存かどうかをチェック
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        # assigns(:group)とgroupが同一であるか確認
        expect(assigns(:group)).to eq group
      end

      it 'renders index' do
        # example内でリクエスト時の遷移先のビューが、indexアクションのビューと同じか確認
        expect(response).to render_template :index
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path' do
        # ログイン画面にリダイレクトするかどうかを確かめる
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
  describe '#create' do
    # 擬似的にcreateアクションをリクエストする際に、引数として渡すためのものを定義
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'log in' do
      before do
        login user
      end

      context 'can save' do
        # postメソッドでcreateアクションを擬似的にリクエストをした結果
        subject {
          post :create,
          params: params
        }

        it 'count up message' do
          # Messageモデルのレコードの総数が1個増えたかどうかを確認
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects to group_messages_path' do
          subject
          # リダイレクト先の画面が合っているか
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        # createアクションをリクエスト時にinvalid_paramsを引数として渡して、メッセージの保存に失敗する場合を再現
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        it 'does not count up' do
          # 保存に失敗したことを確認
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in' do

      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end