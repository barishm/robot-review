package com.robobg.service.impl;

import com.robobg.entity.Robot;
import com.robobg.entity.dtos.*;
import com.robobg.entity.dtos.RobotDTO.CreateRobotDTO;
import com.robobg.entity.dtos.RobotDTO.RobotDTO;
import com.robobg.exceptions.RobotAlreadyExistsException;
import com.robobg.repository.RobotRepository;
import com.robobg.service.RobotService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RobotServiceImpl implements RobotService {


    private final RobotRepository robotRepository;
    private final S3Service s3Service;
    private final ModelMapper modelMapper;


    @Autowired
    public RobotServiceImpl(RobotRepository robotRepository, S3Service s3Service, ModelMapper modelMapper) {
        super();
        this.robotRepository = robotRepository;
        this.s3Service = s3Service;
        this.modelMapper = modelMapper;
    }

    public List<RobotDTO> findByIdIn(List<Long> ids) {
        List<Robot> robots = robotRepository.findByIdIn(ids);

        return robots.stream()
                .map(robot -> modelMapper.map(robot, RobotDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<RobotIdModelImageBestsDTO> findAllBests() {
        return robotRepository.findAllBests().stream()
                .filter(robot -> Boolean.TRUE.equals(robot.getBests()))
                .map(robot -> modelMapper.map(robot, RobotIdModelImageBestsDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<RobotDTO> getAllRobots() {
        return robotRepository.findAll().stream()
                .map(robot -> modelMapper.map(robot, RobotDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<RobotModelDTO> getAllModels() {
        return robotRepository.findAll().stream()
                .map(robot -> modelMapper.map(robot,RobotModelDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<RobotModelLinksDTO> getAllModelsLinksById(Long id) {
        Optional<Robot> robot = robotRepository.findById(id);
        if (robot.isPresent()) {
            RobotModelLinksDTO robotModelLinksDTO = modelMapper.map(robot.get(), RobotModelLinksDTO.class);
            return Optional.of(robotModelLinksDTO);
        }
        return Optional.empty();
    }


    public List<RobotIdModelImageDTO> getAllRobotIdModelImage() {
        return robotRepository.findAll().stream()
                .map(robot -> modelMapper.map(robot, RobotIdModelImageDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<RobotIdModelImageLinksDTO> getAllRobotIdModelImageLinks() {
        return robotRepository.findAll().stream()
                .map(robot -> modelMapper.map(robot, RobotIdModelImageLinksDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void saveRobot(CreateRobotDTO createRobotDTO) throws RobotAlreadyExistsException {
        if (robotRepository.existsByModel(createRobotDTO.getModel())) {
            throw new RobotAlreadyExistsException("Robot already exists");
        }
        Robot robot = modelMapper.map(createRobotDTO, Robot.class);
        robotRepository.save(robot);
    }

    @Override
    public void updateRobot(CreateRobotDTO createRobotDTO) {
        Robot robot = modelMapper.map(createRobotDTO, Robot.class);
        String image = robotRepository.findImageById(createRobotDTO.getId());
        robot.setImage(image);
        robotRepository.save(robot);
    }

    @Override
    public void deleteRobotById(Long id) throws NotFoundException {
        Optional<Robot> optionalRobot = robotRepository.findById(id);
        if (optionalRobot.isPresent()) {
            robotRepository.deleteById(id);
            Robot robot = optionalRobot.get();
        } else {
            throw new NotFoundException();
        }
    }

    @Override
    public void uploadRobotImage(Long robotId, MultipartFile file) throws IOException {
        boolean b = robotRepository.existsById(robotId);
        if(b) {
            s3Service.putObject(
                    "robot-review-robot-images",
                    "%s".formatted(robotId),
                    file.getBytes()
            );
        }

    }

    @Override
    public List<?> getRobots(HashSet<String> fields) {
        if(fields == null){
            return getAllRobots();
        }else {
            if (fields.containsAll(Arrays.asList("model", "image", "links", "bests"))) {
                return findAllBests();
            } else if (fields.containsAll(Arrays.asList("model", "image", "links"))) {
                return getAllRobotIdModelImageLinks();
            } else if (fields.containsAll(Arrays.asList("model", "image"))) {
                return getAllRobotIdModelImage();
            } else if (fields.contains("model")) {
                return getAllModels();
            }
        }
        return null;
    }
    @Override
    public Optional<?> getRobotById(Long id,HashSet<String> fields) {
        if(fields == null){
            Optional<Robot> robot = robotRepository.findById(id);
            if (robot.isPresent()) {
                RobotDTO robotDTO = modelMapper.map(robot.get(), RobotDTO.class);
                return Optional.of(robotDTO);
            }
        } else {
            if(fields.containsAll(Arrays.asList("model", "links"))){
                return getAllModelsLinksById(id);
            }
        }
        return Optional.empty();
    }
}
