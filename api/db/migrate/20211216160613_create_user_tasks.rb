class CreateUserTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :user_tasks do |t|
      t.text        :time_spent
      t.references  :user, index: true
      t.references  :task, index: true

      t.timestamps
    end
  end
end
