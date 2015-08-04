require 'support/pulp/task_support'

module Katello
  module RepositorySupport
    include TaskSupport

    @repo_url = "file:///var/www/test_repos/zoo"
    @puppet_repo_url = "http://davidd.fedorapeople.org/repos/random_puppet/"
    @repo     = nil

    def self.repo_id
      @repo.id
    end

    class << self
      attr_reader :repo
    end

    class << self
      attr_reader :repo_url
    end

    def self.create_and_sync_repo(repo_id)
      @repo = create_repo(repo_id)
      sync_repo
    end

    def self.create_repo(repo_id)
      @repo = Repository.find(repo_id)
      @repo.relative_path = '/test_path/'
      @repo.url = @repo.content_type == 'puppet' ? @puppet_repo_url : @repo_url

      ::ForemanTasks.sync_task(::Actions::Pulp::Repository::Create,
                               content_type: @repo.content_type,
                               pulp_id: @repo.pulp_id,
                               name: @repo.name,
                               feed: @repo.url,
                               ssl_ca_cert: @repo.feed_ca,
                               ssl_client_cert: @repo.feed_cert,
                               ssl_client_key: @repo.feed_key,
                               unprotected: @repo.unprotected,
                               checksum_type: @repo.checksum_type,
                               path: @repo.relative_path,
                               with_importer: true
                              )
      return @repo
    end

    def self.sync_repo
      ::ForemanTasks.sync_task(::Actions::Pulp::Repository::Sync,
                               pulp_id: @repo.pulp_id
                              )
    end

    def self.destroy_repo(pulp_id = @repo.pulp_id)
      ::ForemanTasks.sync_task(::Actions::Pulp::Repository::Destroy, :pulp_id => pulp_id)
    rescue RestClient::ResourceNotFound => e
      puts "Failed to destroy repo #{e.message}"
    end
  end
end
