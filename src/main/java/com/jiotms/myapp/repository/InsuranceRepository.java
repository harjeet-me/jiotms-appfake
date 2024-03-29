package com.jiotms.myapp.repository;
import com.jiotms.myapp.domain.Insurance;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Insurance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InsuranceRepository extends JpaRepository<Insurance, Long> {

}
