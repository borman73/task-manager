ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'sidekiq/testing'

if ENV['COVERAGE']
  require 'simplecov'
  require 'simplecov-lcov'
  require 'coveralls'

  Coveralls.wear!

  SimpleCov::Formatter::LcovFormatter.config do |c|
    c.report_with_single_file = true
    c.single_report_path = 'coverage/lcov/lcov.info'
  end

  SimpleCov.formatter = SimpleCov::Formatter::LcovFormatter

  SimpleCov.start do
    add_filter '/test/'
    add_filter '/app/controllers/concerns/'
  end
end

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods

  parallelize(workers: :number_of_processors)

  fixtures :all

  include AuthHelper
  include ActionMailer::TestHelper
end
