package raf.microservice.components.userservice.config;

import jakarta.servlet.Filter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.POST;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private static final String[] WHITE_LIST_URL = {
            "/api/client/register",
            "/api/client/login",
            "/api/manager/register",
            "/api/manager/login",
            "/api/admin/login",
            "/api/client/verify/{id}",
            "/api/manager/verify/{id}"
    };
    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter, AuthenticationProvider authenticationProvider){
        this.jwtAuthFilter = jwtAuthFilter;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{

        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/client/me").hasRole("CLIENT")
                        .requestMatchers("/api/client/edit").hasRole("CLIENT")
                        .requestMatchers("/api/client/change-password").hasRole("CLIENT")
                        .requestMatchers("/api/manager/me").hasRole("MANAGER")
                        .requestMatchers("/api/manager/edit").hasRole("MANAGER")
                        .requestMatchers(WHITE_LIST_URL).permitAll() //  allow paths to access without auth
                        .anyRequest().authenticated() // all other paths need auth
                )
                .sessionManagement(ses -> ses.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)  //  provider
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);  //  add filter which will check every request


        return httpSecurity.build();
    }
}
