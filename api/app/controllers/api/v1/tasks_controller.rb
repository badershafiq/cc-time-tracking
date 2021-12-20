class Api::V1::TasksController < Api::V1::ApiController
  before_action :set_user_task, only: :update

  def index
    tasks = Task.all
    render json: { success: true, data: tasks }, status: 200
  end

  def show
    task = Task.find(task_id)
    return render(json: { success: false, errors: 'Task not found' }) \
      if task.nil?

    render json: { success: true, data: task }, status: 200
  end

  def update
    task = Task.find(task_id)

    if task.submitted?
      return render(
        json: { success: false, errors: 'Task already submitted' },
        status: 403
      )
    end

    success = task.update(task_params)

    save_task_end_time if success

    return render(
      json: {
        success: success,
        errors: task.errors,
        data: task
      },
      status: success ? 200 : 422
    )
  end

  def task_summary
    user_tasks = UserTask.where(task_id: task_id)

    task_summary = user_tasks.map do |user_task|
      {
        user_id: user_task.user_id,
        user_activity: {
          total_time_taken: total_time_taken_for_task,
          sessions_count: user_task.time_spent.size,
          average_session: (user_task.time_spent.pluck(:time_taken).sum.to_f / user_task.time_spent.size).round(2),
        }
      }
    end

    render json: { success: true, data: task_summary }, status: 200
  end

  private

  def task_params
    params.require(:task).permit(
      :submitted,
      :answer
    )
  end

  def task_id
    params[:id]
  end

  def total_time_taken_for_task
    user_task.time_spent.pluck(:time_taken).sum
  end

  def set_user_task
    @user_task = UserTask.find_or_initialize_by(
      user_id: params[:user_id],
      task_id: task_id
    )
  end

  def save_task_end_time
    @user_task.set_task_end_time
    @user_task.save
  end
end
