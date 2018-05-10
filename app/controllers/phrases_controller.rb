class PhrasesController < ApplicationController
  def index; end

  def new
    phrase = { phrase: 'This is a new phrase' }
    respond_to do |format|
      format.json { render :json => phrase }
    end
  end  
end
