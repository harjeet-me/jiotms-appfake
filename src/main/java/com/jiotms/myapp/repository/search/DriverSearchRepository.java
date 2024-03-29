package com.jiotms.myapp.repository.search;
import com.jiotms.myapp.domain.Driver;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Driver} entity.
 */
public interface DriverSearchRepository extends ElasticsearchRepository<Driver, Long> {
}
