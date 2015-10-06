describe('Controller: ContentHostSubscriptionsController', function() {
    var $scope,
        $controller,
        translate,
        ContentHost,
        Subscription,
        Nutupane,
        expectedTable,
        expectedRows,
        SubscriptionsHelper;

    beforeEach(module(
        'Bastion.content-hosts',
        'Bastion.subscriptions',
        'Bastion.test-mocks',
        'content-hosts/details/views/host-collections.html',
        'content-hosts/views/content-hosts.html',
        'content-hosts/views/content-hosts-table-full.html'
    ));

    beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller'),
            $q = $injector.get('$q');

        ContentHost = $injector.get('MockResource').$new();
        $scope = $injector.get('$rootScope').$new();
        $location = $injector.get('$location');
        SubscriptionsHelper = $injector.get('SubscriptionsHelper');

        ContentHost.removeSubscriptions = function() {};

        translate = function(message) {
            return message;
        };

        expectedRows = [];

        expectedTable = {
            showColumns: function() {},
            getSelected: function() {
                return expectedRows;
            },
            rows: function () {
                return expectedRows;
            },
            selectAll: function() {},
            allSelected: false
        };
        Nutupane = function() {
            this.table = expectedTable;
            this.removeRow = function() {};
            this.get = function() {};
            this.query = function() {};
            this.refresh = function() {};
        };

        $scope.contentHost = new ContentHost({
            uuid: 12345,
            subscriptions: [{id: 1, quantity: 11}, {id: 2, quantity: 22}]
        });

        $scope.subscriptionsPane = {
            refresh: function() {},
            table: {}
        }

        $controller('ContentHostSubscriptionsController', {
            $scope: $scope,
            $location: $location,
            translate: translate,
            Subscription: Subscription,
            Nutupane: Nutupane,
            ContentHost: ContentHost,
            SubscriptionsHelper: SubscriptionsHelper
        });
    }));

    it('attaches the nutupane table to the scope', function() {
        expect($scope.detailsTable).toBeDefined();
    });

    it("allows removing subscriptions from the content host", function() {

        var expected = {uuid: 12345, subscriptions: [{id: 2}]};
        spyOn(ContentHost, 'removeSubscriptions');

        $scope.detailsTable.getSelected = function() {
            return [{id: 2}];
        };

        $scope.removeSelected();
        expect(ContentHost.removeSubscriptions).toHaveBeenCalledWith(expected, jasmine.any(Function), jasmine.any(Function));
    });
});
