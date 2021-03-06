/*
 * Password Management Servlets (PWM)
 * http://www.pwm-project.org
 *
 * Copyright (c) 2006-2009 Novell, Inc.
 * Copyright (c) 2009-2016 The PWM Project
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */


import { IPeopleService } from '../services/people.service';
import { isArray, isString, IPromise, IScope } from 'angular';
import Person from '../models/person.model';
import SearchResult from '../models/search-result.model';

interface ISearchFunction {
    (query: string): IPromise<SearchResult>;
}

export default class PeopleSearchBaseComponent {
    loading: boolean;
    query: string;
    searchFunction: ISearchFunction;
    searchMessage: (string | IPromise<string>);
    searchResult: SearchResult;

    protected constructor(protected $scope: IScope,
                          protected $state: angular.ui.IStateService,
                          protected $stateParams: angular.ui.IStateParamsService,
                          protected $translate: angular.translate.ITranslateService,
                          protected peopleService: IPeopleService) {}

    gotoOrgchart(): void {
        this.gotoState('orgchart.index');
    }

    gotoState(state: string): void {
        this.$state.go(state, { query: this.query });
    }

    initialize(searchFunction: ISearchFunction): void {
        this.searchFunction = searchFunction;

        // Read query from state parameters
        var queryParameter = this.$stateParams['query'];
        // If multiple query parameters are defined, use the first one
        if (isArray(queryParameter)) {
            this.query = queryParameter[0].trim();
        }
        else if (isString(queryParameter)) {
            this.query = queryParameter.trim();
        }

        this.fetchData();
    }

    onSearchBoxKeyDown(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case 27: // ESC
                this.clearSearch();
                break;
        }
    }

    onSearchTextChange(value: string): void {
        if (value === this.query) {
            return;
        }

        this.query = value;
        this.setSearchMessage(null);
        this.fetchData();
    }

    selectPerson(person: Person): void {
        this.$state.go('.details', { personId: person.userKey, query: this.query });
    }

    protected setSearchMessage(message: (string | IPromise<string>)) {
        if (!message) {
            this.clearSearchMessage();
            return;
        }

        if (typeof message === 'string') {
            this.searchMessage = message;
        }
        else {
            var self = this;

            message.then((translation: string) => {
                self.searchMessage = translation;
                // self.$scope.$apply();
            });
        }
    }

    protected fetchData(): void {
        const self = this;

        if (!this.query) {
            this.clearSearch();
            return;
        }

        this.loading = true;

        this.searchFunction
            .call(this.peopleService, this.query)
            .then((searchResult: SearchResult) => {
                self.searchResult = searchResult;
                self.clearSearchMessage();

                // Too many results returned
                if (searchResult.sizeExceeded) {
                    self.setSearchMessage(self.$translate('Display_SearchResultsExceeded'));
                }
                // No results returned. Not an else if statement so that the more important message is presented
                if (!searchResult.people.length) {
                    self.setSearchMessage(self.$translate('Display_SearchResultsNone'));
                }
            })
            .finally(() => {
                self.loading = false;
            });
    }

    private clearSearch(): void {
        this.query = null;
        this.searchResult = null;
        this.clearSearchMessage();
    }

    private clearSearchMessage(): void  {
        this.searchMessage = null;
    }
}
