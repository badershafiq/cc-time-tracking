Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tasks, except: [:destroy] do
        member do
          get :task_summary
        end
      end

      post '/set_start_time/:task_id', to: 'user_tasks#set_start_time'
      put '/set_end_time/:task_id', to: 'user_tasks#set_end_time'
      get '/users_summary', to: 'user_tasks#users_summary'
    end
  end
end
