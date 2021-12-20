class Api::V1::UserTasksController < Api::V1::ApiController
	before_action :set_user_task, only: [:set_start_time, :set_end_time]

	def set_start_time
    @user_task.set_task_end_time if session_refreshed? # set end time for last session if task is refreshed

    @user_task.set_task_start_time
  end

  def set_end_time
    @user_task.set_task_end_time

    save_user_task
  end

  private

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
