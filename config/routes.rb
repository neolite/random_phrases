Rails.application.routes.draw do
  esources :phrases, :only => [:index]
  root 'phrases#index'
  get '/new_phrase', to: 'phrases#new'
end
