import classNames from 'classnames';
import { Person } from '../types/Person';
import { useParams, useSearchParams } from 'react-router-dom';
import { HumanLink } from './HumanLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

enum SortBy {
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortToggle = (sortBy: string) => {
    if (sortBy === sort && order) {
      return {
        sort: null,
        order: null,
      };
    }

    if (sortBy === sort) {
      return {
        sort: sortBy,
        order: 'desc',
      };
    }

    return {
      sort: sortBy,
      order: null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {!!people.length && (
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <SearchLink params={sortToggle(SortBy.NAME)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== SortBy.NAME,
                        'fa-sort-up': sort === SortBy.NAME && !order,
                        'fa-sort-down': sort === SortBy.NAME && order,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SearchLink params={sortToggle(SortBy.SEX)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== SortBy.SEX,
                        'fa-sort-up': sort === SortBy.SEX && !order,
                        'fa-sort-down': sort === SortBy.SEX && order,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SearchLink params={sortToggle(SortBy.BORN)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== SortBy.BORN,
                        'fa-sort-up': sort === SortBy.BORN && !order,
                        'fa-sort-down': sort === SortBy.BORN && order,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SearchLink params={sortToggle(SortBy.DIED)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== SortBy.DIED,
                        'fa-sort-up': sort === SortBy.DIED && !order,
                        'fa-sort-down': sort === SortBy.DIED && order,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
      )}

      <tbody>
        {people.map(human => (
          <tr
            data-cy="person"
            key={human.slug}
            className={classNames({
              'has-background-warning': slug === human.slug,
            })}
          >
            <td aria-label={human.name}>
              <HumanLink person={human} />
            </td>

            <td>{human.sex}</td>
            <td>{human.born}</td>
            <td>{human.died}</td>

            <td>
              {human.mother ? (
                <HumanLink person={human.mother} />
              ) : (
                human.motherName || '-'
              )}
            </td>

            <td>
              {human.father ? (
                <HumanLink person={human.father} />
              ) : (
                human.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
