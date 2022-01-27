require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  test 'task created' do
    user = create(:user)
    task = create(:task, author: user)
    params = { user: user, task: task }
    email = UserMailer.with(params).task_created

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal [user.email], email.to
    assert_equal 'New Task Created', email.subject
    assert email.body.to_s.include?("Task #{task.id} was created")
  end

  test 'password_reset created' do
    user = create(:user)
    token = SecureRandom.urlsafe_base64
    user.update(password_reset_digest: token, reset_requested_at: Time.current)

    email = UserMailer.with({ user: user }).password_reset

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal [user.email], email.to
    assert_equal 'Password reset | Task Manager', email.subject
    assert email.body.to_s.include?(user.password_reset_digest)
  end
end
