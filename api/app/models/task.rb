# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :user
  has_many :user_tasks

  validates :answer, presence: true, if: :submitted?
end
