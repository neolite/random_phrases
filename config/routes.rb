Rails.application.routes.draw do
  resources :phrases, :only => [:index]
  root 'phrases#index'
  get '/new_phrase', to: 'phrases#new'
end
