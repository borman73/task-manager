FactoryBot.define do
  factory :user do
    first_name
    last_name
    password
    email
    avatar
    type { '' }

    factory :admin do
      type { 'Admin' }
      first_name
      last_name
      email
      password
    end

    factory :developer do
      type { 'Developer' }
    end

    factory :manager do
      type { 'Manager' }
    end
  end
end
