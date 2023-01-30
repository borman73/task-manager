require 'test_helper'

class Web::PasswordResetsControllerTest < ActionController::TestCase
  test 'should get new' do
    get :new
    assert_response :success
  end

  test 'should post create' do
    user = create(:user)
    password_reset_digest_before_reset = user.password_reset_digest

    post :create, params: { password_reset_form: { email: user.email } }
    assert_response :redirect

    user.reload
    assert password_reset_digest_before_reset != user.password_reset_digest
  end

  test 'should get edit' do
    user = create(:user)
    user.set_password_reset_digest
    UserMailer.with({ user: user }).password_reset.deliver_now
    token = user.password_reset_digest

    get :edit, params: { user: { password_reset_digest: token, email: user.email } }
    assert_response :success
  end

  test 'should patch update' do
    user = create(:user)
    user.set_password_reset_digest
    UserMailer.with({ user: user }).password_reset.deliver_now

    new_password = generate(:string)

    attrs = {
      password: new_password,
      password_confirmation: new_password,
    }

    patch :update, params: { user: { password_reset_digest: user.password_reset_digest, email: user.email, user: attrs } }
    assert_response :redirect
    user.reload
    assert user.password_reset_digest.nil?
    assert user.reset_requested_at.nil?
  end
end
