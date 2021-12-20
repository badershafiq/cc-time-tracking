# frozen_string_literal: true

class UserTask < ApplicationRecord
  serialize :time_spent, Array

  belongs_to :user
  belongs_to :task

  def set_task_start_time
    time_spent << { start_time: Time.now }
  end

  def set_task_end_time
    time_spent.last[:end_time] = Time.now
    time_spent.last[:time_taken] = calculate_time_difference time_spent.last
  end

  private

  def calculate_time_difference(task_time)
    (task_time[:end_time] - task_time[:start_time]).to_i
  end
end
