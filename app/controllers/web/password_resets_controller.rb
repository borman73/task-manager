class Web::PasswordResetsController < Web::ApplicationController
  def new
    @password_reset = PasswordResetForm.new
  end

  def create
    @password_reset = PasswordResetForm.new(password_reset_params)
    @email = @password_reset.email

    if @password_reset.valid?
      @user = @password_reset.user
      @user.set_password_reset_digest
      UserMailer.with({ user: @user }).password_reset.deliver_now

      redirect_to(new_session_path, notice: 'Password reset instructions were sent to your email address')
    else
      flash[:alert] = 'There is no user with such email'
      render(:new)
    end
  end

  def edit
    get_user
  end

  def update
    get_user

    if @user.update(user_params)
      @user.clear_password_reset_digest
      redirect_to(new_session_path, notice: 'Your password was successfully updated')
    else
      render(:edit)
    end
  end

  private

  def password_reset_params
    params.require(:password_reset_form).permit(:email)
  end

  def get_user
    @user = User.find_by(password_reset_digest: params[:user][:password_reset_digest])

    unless @user.password_reset_period_valid?
      redirect_to(new_session_path, alert: 'Password reset link has expired. Please request another one.')
    end
  end

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
