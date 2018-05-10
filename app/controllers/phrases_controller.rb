class PhrasesController < ApplicationController
  def index; end

  def new
    phrases = cookies[:phrases]
    phrase = Phrase.where.not(id: phrases).order("RANDOM()").first
    respond_to do |format|
      format.json { render :json => phrase.slice(:id, :title) }
    end
  end  
end
