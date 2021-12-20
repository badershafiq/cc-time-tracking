class Api::V1::UserTasksController < Api::V1::ApiController
	before_action :set_user_task, only: [:set_start_time, :set_end_time]

	def set_start_time
    @user_task.set_task_end_time if session_refreshed? # set end time for last session if task is refreshed

    @user_task.set_task_start_time

    save_user_task
  end

  def set_end_time
    @user_task.set_task_end_time

    save_user_task
  end

  def users_summary
    users_summary = User.includes(:tasks, :user_tasks).map do |user|
      {
        user_id: user.id,
        user_summary: {
          total_time: user_total_time(user).sum,
          average_submission_time: submission_average(user),
          average_session: (user_total_time(user).sum.to_f / user_total_time(user).count).round(2)
        }
      }
    end

    render json: { success: true, data: users_summary }, status: 200
  end

  private

  def submission_average user
    user_tasks = UserTask.where(user_id: user.id, task_id: user.tasks.where(submitted: true).ids)

    return 'No task submitted yet' unless user_tasks.present?

    (user_tasks.pluck(:time_spent).flatten.pluck(:time_taken).sum.to_f / user_tasks.size).round(2)
  end

  def user_total_time user
    user.user_tasks.pluck(:time_spent).flatten.pluck(:time_taken).compact
  end

  def set_user_task
    @user_task = UserTask.find_or_initialize_by(
      user_id: params[:user_id],
      task_id: params[:task_id]
    )
  end

  def session_refreshed?
    return false unless @user_task.time_spent.present?

    !@user_task.time_spent.last[:end_time].present?
  end

  def save_user_task
    if @user_task.save
      render json: { success: true }
    else
      render json: { error: true, errors: 'Unable to save' }
    end
  end
end
