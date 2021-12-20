class UserTask < ApplicationRecord
	serialize :time_spent, Array

	belongs_to :user
	belongs_to :task
end
